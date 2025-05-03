export default async function handler(req, res) {
  const { email } = req.body;

  // 呼叫 LemonSqueezy API 查詢訂閱狀態
  const response = await fetch('https://api.lemonsqueezy.com/v1/subscriptions', {
    headers: {
      'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      'Accept': 'application/json'
    }
  });
  const data = await response.json();

  // 篩選該 email 是否有有效訂閱
  const isActive = data.data.some(sub => sub.attributes.user_email === email && sub.attributes.status === 'active');
  res.status(200).json({ valid: isActive });
}
