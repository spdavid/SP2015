// this file shows us that javascript can read json

var myJson = {
    "@odata.context": "http://services.odata.org/V4/Northwind/Northwind.svc/$metadata#Customers",
    "value": [
        {
            "CustomerID": "AROUT",
            "CompanyName": "Around the Horn",
            "ContactName": "Thomas Hardy",
            "ContactTitle": "Sales Representative",
            "Address": "120 Hanover Sq.",
            "City": "London",
            "Region": null,
            "PostalCode": "WA1 1DP",
            "Country": "UK",
            "Phone": "(171) 555-7788",
            "Fax": "(171) 555-6750"
        },
        {
            "CustomerID": "BSBEV",
            "CompanyName": "B's Beverages",
            "ContactName": "Victoria Ashworth",
            "ContactTitle": "Sales Representative",
            "Address": "Fauntleroy Circus",
            "City": "London",
            "Region": null,
            "PostalCode": "EC2 5NT",
            "Country": "UK",
            "Phone": "(171) 555-1212",
            "Fax": null
        },
        {
            "CustomerID": "CONSH",
            "CompanyName": "Consolidated Holdings",
            "ContactName": "Elizabeth Brown",
            "ContactTitle": "Sales Representative",
            "Address": "Berkeley Gardens 12  Brewery",
            "City": "London",
            "Region": null,
            "PostalCode": "WX1 6LT",
            "Country": "UK",
            "Phone": "(171) 555-2282",
            "Fax": "(171) 555-9199"
        },
        {
            "CustomerID": "EASTC",
            "CompanyName": "Eastern Connection",
            "ContactName": "Ann Devon",
            "ContactTitle": "Sales Agent",
            "Address": "35 King George",
            "City": "London",
            "Region": null,
            "PostalCode": "WX3 6FW",
            "Country": "UK",
            "Phone": "(171) 555-0297",
            "Fax": "(171) 555-3373"
        },
        {
            "CustomerID": "NORTS",
            "CompanyName": "North/South",
            "ContactName": "Simon Crowther",
            "ContactTitle": "Sales Associate",
            "Address": "South House 300 Queensbridge",
            "City": "London",
            "Region": null,
            "PostalCode": "SW7 1RZ",
            "Country": "UK",
            "Phone": "(171) 555-7733",
            "Fax": "(171) 555-2530"
        },
        {
            "CustomerID": "SEVES",
            "CompanyName": "Seven Seas Imports",
            "ContactName": "Hari Kumar",
            "ContactTitle": "Sales Manager",
            "Address": "90 Wadhurst Rd.",
            "City": "London",
            "Region": null,
            "PostalCode": "OX15 4NB",
            "Country": "UK",
            "Phone": "(171) 555-1717",
            "Fax": "(171) 555-5646"
        }
    ]
};


    alert(myJson.value[0].City);
    console.log(myJson);
