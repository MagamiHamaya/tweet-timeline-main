fetch("https://opensheet.elk.sh/1T6dq7sC81za_P0nHxjzWab1vIVw-Yi_AgVxR9qKdNfA/main")
  .then(res => res.json())
  .then(data => {
    let html = `<div style="font-family:sans-serif; padding:10px;">`;
    data.forEach(item => {
      html += `
        <div style="border-bottom:1px solid #ccc; margin-bottom:10px; padding-bottom:10px;">
          <strong style="color:#555;">${item.date}</strong><br>
          <a href="${item.url}" target="_blank" style="text-decoration:none; color:#1d9bf0;">
            ${item.text}
          </a>
        </div>
      `;
    });
    html += `</div>`;
    document.body.innerHTML += html;
  });
