fetch("https://opensheet.elk.sh/1T6dq7sC81za_P0nHxjzWab1vIVw-Yi_AgVxR9qKdNfA/main")
  .then(res => res.json())
  .then(async rows => {
    let html = `<div style="font-family:sans-serif; padding:10px;">`;

    for (const row of rows) {
      const tweetUrl = row.url;
      try {
        const statusMatch = tweetUrl.match(/status\/(\d+)/);
        const usernameMatch = tweetUrl.match(/nitter\.net\/([^\/]+)/);
        if (!statusMatch || !usernameMatch) continue;

        const statusId = statusMatch[1];
        const username = usernameMatch[1];
        const apiUrl = `https://nitter.net/${username}/status/${statusId}.json`;

        const res = await fetch(apiUrl);
        const tweet = await res.json();

        html += `
          <div style="border-bottom:1px solid #ccc; margin-bottom:10px; padding-bottom:10px;">
            <strong style="color:#555;">${tweet.date}</strong><br>
            <div style="margin:5px 0;">${tweet.text}</div>
        `;

        if (tweet.media?.length > 0) {
          tweet.media.forEach(mediaUrl => {
            html += `<img src="${mediaUrl}" style="max-width:100%; border-radius:8px; margin-top:5px;"><br>`;
          });
        }

        html += `<a href="${tweetUrl}" target="_blank" style="color:#1d9bf0;">→元ツイートを表示</a></div>`;
      } catch (e) {
        html += `<div style="color:red;">読み込みエラー: ${tweetUrl}</div>`;
      }
    }

    html += `</div>`;
    document.body.innerHTML += html;
  });
document.body.innerHTML += "<p>読み込み完了</p>";
