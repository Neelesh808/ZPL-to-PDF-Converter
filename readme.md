Created ZPL to PDF converted in below steps :

- Used labelary api to to pass ZPL code on labelary server & to get the PDF document against the request sent.
- Created a function to send fetch requet to labelary sever with required data & to get the PDF document in response.
- Used "PDFLib" to get the blob data converted into in PDF document & to generate a PDF file of combined pages.
- Created a basic HTML page to ask for ZPL code from user & submit the button.
- Used addEventListener to capture the ZPL code data entered by user as soon as he clicks submit button.
