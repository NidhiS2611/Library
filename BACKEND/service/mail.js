


const nodemailer = require('nodemailer');

const sendMail = async (email, type, title, author, fine = 0) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nidhikalpana555@gmail.com',
        pass: 'xsawolsybkcbeaeh',
      },
    });

    let subject = '';
    let htmlContent = '';

    switch (type) {
      case 'newBook':
        subject = '📚 New Book Added to Library';
        htmlContent = `
          <div style="font-family: Arial, sans-serif;">
            <h2 style="color: #2c3e50;">📚 New Book Alert!</h2>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Author:</strong> ${author}</p>
            <p style="color: green;">Check it out in the library now!</p>
          </div>
        `;
        break;

      case 'overdue':
        subject = '⚠️ Book Overdue Notice';
        htmlContent = `
          <div style="font-family: Arial, sans-serif;">
            <h2 style="color: #e74c3c;">⚠️ Overdue Reminder</h2>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Author:</strong> ${author}</p>
            <p style="color: red;">Please return the book immediately to avoid fines.</p>
          </div>
        `;
        break;

      case 'returnedWithFine':
        subject = '✅ Book Returned - Fine Details';
        htmlContent = `
          <div style="font-family: Arial, sans-serif;">
            <h2 style="color: #3498db;">✅ Book Returned</h2>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Author:</strong> ${author}</p>
            <p style="color: orange;">Fine Incurred: ₹${fine}</p>
            <p>Please pay the fine at the counter or online.</p>
          </div>
        `;
        break;

      default:
        subject = '📬 Library Notification';
        htmlContent = `
          <div style="font-family: Arial, sans-serif;">
            <h2 style="color: #555;">📬 Notification</h2>
            <p>This is a general message from the library system.</p>
          </div>
        `;
        break;
    }

    const mailOptions = {
      from: 'nidhikalpana555@gmail.com',
      to: email,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${email} with subject: "${subject}"`);
  } catch (err) {
    console.error('❌ Error sending email:', err.message);
  }
};

module.exports = {sendMail};

 