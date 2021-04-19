# What is powerbi-app?

This sample is an angular application that uses power bi embedding to embed a report.

# Prerequisite

For the sample to run and render the report, there needs to be an Azure Function app [powerbi-app-functions](https://github.com/sdesa/powerbi-app-functions) that you need to have running on the default 7071 port.

# Blog 

This source code is accompanied by a blog that you can access here which has additional setup instructions that you need to complete before running this.

https://medium.com/@sivadevd01/power-bi-embedding-using-angular-and-azure-functions-in-java-4b20de3cca80

# How to run this sample

Running instructions:

1. Replace the reportId and groupId variables in `report.component.ts` with your specific report and group ids.
2. When running the application, use the following command to avoid CORS issues.

      `ng serve --proxyConfig=proxy.conf.json`


# References

1. https://github.com/microsoft/PowerBI-JavaScript
2. https://docs.microsoft.com/en-us/power-bi/developer/embedded/embed-sample-for-customers
