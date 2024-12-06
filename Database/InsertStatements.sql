IF EXISTS (SELECT 1 FROM sys.databases WHERE NAME = 'dashboard')
BEGIN
    USE dashboard;
    IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Product' AND TABLE_SCHEMA = 'dbo')
        INSERT INTO [dbo].[Product] ([Name],[Description],[Category] ,[Price] )
		VALUES ('Product 1','New Product 1','Book', 10),
			   ('Product 2','New Product 2','Book', 10),
			   ('Product 3','New Product 3','Book', 10),
			   ('Product 4','New Product 4','Book', 10),
			   ('Product 5','New Product 5','Craft', 10),
			   ('Product 6','New Product 6','Craft', 10),
			   ('Product 7','New Product 7','Building', 10),
			   ('Product 8','New Product 8','Building', 10),
			   ('Product 9','New Product 9','Building', 10),
			   ('Product 10','New Product 10','Building', 10)
    ELSE
        PRINT 'Database exists, but table does not exist';
END
ELSE
    PRINT 'Database does not exist';