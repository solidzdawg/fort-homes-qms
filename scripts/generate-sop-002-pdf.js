const fs = require('fs');
const pdf = require('html-pdf');
const markdown = require('markdown').markdown;

// Read the Markdown file
fs.readFile('SOP-002-Training-Competency-Management-V2.md', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }

    // Convert Markdown to HTML
    const htmlContent = markdown.toHTML(data);

    // PDF options
    const options = {
        format: 'Letter',
        margin: {
            top: "30px",
            right: "30px",
            bottom: "30px",
            left: "30px"
        },
        header: {
            height: "45px",
            contents: '<div style="text-align: center;"><h1>Fort Homes</h1><h2>Standard Operating Procedure</h2></div>'
        },
        footer: {
            height: "45px",
            contents: '<div style="text-align: center;">Page: {{page}} of {{pages}}</div>'
        }
    };

    // Create PDF
    pdf.create(htmlContent, options).toFile('SOP-002-Training-Competency-Management-V2.pdf', (err, res) => {
        if (err) return console.log(err);
        console.log(res);
    });
});
