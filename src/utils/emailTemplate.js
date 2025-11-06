export function emailTemplate({ name, email, reason, message, icon }) {
  const initials = name?.charAt(0)?.toUpperCase() || "?";
  const sendId = Date.now();

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${reason}</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #0a0a0a; padding: 20px; color: #fff; margin: 0;">
    <div style="max-width:600px;margin:0 auto;background-color:#1a1a1a;border-radius:12px;overflow:hidden;">

      <!-- HEADER -->
      <div style="background:linear-gradient(135deg,#c93939 0%,#8b1f1f 100%);text-align:center;padding:30px 20px;">
        <div style="font-size:40px;margin-bottom:10px;">${icon}</div>
        <h1 style="font-size:26px;margin:0;">${reason}</h1>
        <p style="color:#f3f3f3;font-size:14px;margin-top:6px;">Has recibido un nuevo mensaje desde tu portfolio</p>
      </div>

      <!-- CONTENT -->
      <div style="padding:26px;">

        <!-- REMITENTE -->
        <div style="margin-bottom:20px;">
          <p style="margin:0 0 8px;color:#aaa;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Remitente</p>
          
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td width="70" align="center" valign="middle">
                <!-- Avatar circular centrado -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                  <tr>
                    <td width="56" height="56" align="center" valign="middle"
                      style="background:linear-gradient(135deg,#ef4444 0%,#3b82f6 100%);
                             border-radius:50%;
                             font-weight:bold;
                             font-size:20px;
                             color:white;
                             text-align:center;">
                      ${initials}
                    </td>
                  </tr>
                </table>
              </td>

              <td align="left" valign="middle">
                <div style="font-size:18px;font-weight:500;color:#fff;">${name}</div>
                <a href="mailto:${email}" style="color:#ef4444;font-size:14px;text-decoration:none;">${email}</a>
              </td>
            </tr>
          </table>
        </div>

        <!-- MENSAJE -->
        <div style="margin-bottom:22px;">
          <p style="margin:0 0 8px;color:#aaa;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Mensaje recibido</p>
          <div style="background-color:#0a0a0a;border-left:3px solid #ef4444;padding:18px;border-radius:4px;">
            <p style="color:#eee;font-size:14px;line-height:1.7;white-space:pre-wrap;margin:0;">${message}</p>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div style="text-align:center;padding:16px;border-top:1px solid #2a2a2a;color:#888;font-size:12px;">
        <p style="margin:0;">Enviado desde tu <a href="#" style="color:#ef4444;text-decoration:none;">Portfolio ⚡</a></p>
        <p style="margin:4px 0 0;">© 2025 Andrei — Full Stack Developer</p>
        <p style="margin-top:6px;color:#444;">ID: ${sendId}</p>
      </div>
    </div>
  </body>
  </html>
  `;
}
