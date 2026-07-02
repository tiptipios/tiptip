export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const rawBody = await request.text();

    // 1. Tìm đoạn XML nằm trong gói dữ liệu mã hóa của Apple
    const startXml = rawBody.indexOf('<?xml');
    const endXml = rawBody.indexOf('</plist>') + 8;
    
    if (startXml === -1 || endXml === -1) {
      return new Response("Dữ liệu không hợp lệ", { status: 400 });
    }
    
    const xmlContent = rawBody.substring(startXml, endXml);

    // 2. Hàm dùng Regex tách dữ liệu từ XML
    const getTagValue = (xml, key) => {
      const regex = new RegExp(`<key>${key}<\/key>\\s*<string>([^<]+)<\/string>`);
      const match = xml.match(regex);
      return match ? match[1] : "Unknown";
    };

    const udid = getTagValue(xmlContent, "UDID");
    const deviceName = getTagValue(xmlContent, "DEVICE_NAME");
    const product = getTagValue(xmlContent, "PRODUCT");

    // 3. LƯU DỮ LIỆU VÀO DATABASE D1
    // (Lưu ý: Với Pages, DB được gọi qua env.DB giống như Worker)
    await env.DB.prepare(
      "INSERT INTO users_udid (udid, device_name, product, created_at) VALUES (?, ?, ?, ?)"
    ).bind(udid, deviceName, product, new Date().toISOString()).run();

    // 4. CHUYỂN HƯỚNG QUAY LẠI TRANG RESULT
    // Vì chạy chung một tên miền nên không cần điền cả link, chỉ cần điền đường dẫn tĩnh:
    const redirectUrl = `/result.html?udid=${udid}`;
    
    return new Response(null, {
      status: 301,
      headers: { "Location": redirectUrl }
    });

  } catch (error) {
    return new Response("Lỗi xử lý hệ thống: " + error.message, { status: 500 });
  }
}
