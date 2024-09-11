import Script from 'next/script';
export default function LoginLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <Script src="https://unpkg.com/htmx.org@2.0.0"></Script>
        </head>
        <body>
          {children}
        </body>
      </html>
    );
  }
  