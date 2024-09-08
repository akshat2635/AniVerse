export default function LoginLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <script src="https://unpkg.com/htmx.org@2.0.0"></script>
        </head>
        <body>
          {children}
        </body>
      </html>
    );
  }
  