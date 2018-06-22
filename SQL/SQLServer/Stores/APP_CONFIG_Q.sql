-- =============================================
-- Author:		Suttikeat Witchayakul
-- Create date: 30 June 2017
-- Description:	

-- Modified by:	Pariya
-- Modified date: 14/10/2017
-- Description: 
-- =============================================
ALTER PROCEDURE [brownie].[APP_CONFIG_Q]
	@PI_APP_SESSION_USER_ID nvarchar(50) = null,
	
	@PO_STATUS int OUTPUT,
	@PO_STATUS_MSG nvarchar(4000) OUTPUT
AS
BEGIN
	BEGIN TRANSACTION;
	BEGIN TRY

		-- == START ==
		SELECT * FROM UM_SYSTEM
		WHERE SYSTEM_ID IN (
			SELECT fn.SYSTEM_ID FROM UM_USER_ROLE url
			LEFT JOIN UM_PERMISSION_FUNCTION pfn ON url.ROLE_ID=pfn.ROLE_ID
			LEFT JOIN UM_FUNCTION fn ON pfn.FUNCTION_ID=fn.FUNCTION_ID
			WHERE url.USER_ID=@PI_APP_SESSION_USER_ID
			GROUP BY fn.SYSTEM_ID
		)
		ORDER BY ORDER_NO ASC;
		
		------------------------------------------------
		
		SELECT fn.* FROM UM_FUNCTION fn
		LEFT JOIN UM_SYSTEM sys ON fn.SYSTEM_ID=sys.SYSTEM_ID
		WHERE fn.FUNCTION_ID IN (
			SELECT fn2.FUNCTION_ID FROM UM_USER_ROLE url
			LEFT JOIN UM_PERMISSION_FUNCTION pfn ON url.ROLE_ID=pfn.ROLE_ID
			LEFT JOIN UM_FUNCTION fn2 ON pfn.FUNCTION_ID=fn2.FUNCTION_ID
			WHERE url.USER_ID=@PI_APP_SESSION_USER_ID
			GROUP BY fn2.FUNCTION_ID
		)
		ORDER BY sys.ORDER_NO ASC, fn.ORDER_NO ASC

		------------------------------------------------

		SELECT * FROM UM_SERVICE
		WHERE SERVICE_ID IN (
			SELECT sv.SERVICE_ID FROM UM_USER_ROLE url
			LEFT JOIN UM_PERMISSION_SERVICE psv ON url.ROLE_ID=psv.ROLE_ID
			LEFT JOIN UM_SERVICE SV ON psv.SERVICE_ID=sv.SERVICE_ID
			WHERE url.USER_ID=@PI_APP_SESSION_USER_ID
			GROUP BY sv.SERVICE_ID
		)
		ORDER BY ORDER_NO ASC;
		
		------------------------------------------------

		SELECT ly.* FROM UM_LAYER ly
		LEFT JOIN UM_SERVICE sv ON ly.SERVICE_ID=sv.SERVICE_ID
		WHERE LAYER_ID IN (
			SELECT ly.LAYER_ID FROM UM_USER_ROLE url
			LEFT JOIN UM_PERMISSION_LAYER ply ON url.ROLE_ID=ply.ROLE_ID
			LEFT JOIN UM_LAYER ly2 ON ply.LAYER_ID=ly2.LAYER_ID
			WHERE url.USER_ID=@PI_APP_SESSION_USER_ID
			GROUP BY ly2.LAYER_ID
		)
		ORDER BY sv.ORDER_NO ASC, ly.ORDER_NO ASC;
		
		------------------------------------------------

		SELECT * FROM APP_CONFIG;


		SET @PO_STATUS = 1;
		SET @PO_STATUS_MSG = '';
		-- == END ==

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		SET @PO_STATUS = 0;
		SET @PO_STATUS_MSG = brownie.FN_GET_ERROR_MESSAGE(ERROR_NUMBER(), (SELECT OBJECT_NAME(@@PROCID)), ERROR_LINE(), ERROR_MESSAGE());
		ROLLBACK TRANSACTION;
	END CATCH
END