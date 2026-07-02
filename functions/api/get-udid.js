export async function onRequest(context) {
  const { request, env } = context;

  // Xử lý khi Apple gửi request POST chứa thông tin thiết bị
  if (request.method === "POST") {
    try {
      const rawBody = await request.text();

      // 1. Trích xuất phần nội dung XML nằm trong chuỗi mã hóa của Apple
      const startXml = rawBody.indexOf('<?xml');
      const endXml = rawBody.indexOf('</plist>') + 8;
      
      if (startXml === -1 || endXml === -1) {
        return new Response("Dữ liệu XML từ thiết bị không hợp lệ.", { status: 400 });
      }
      
      const xmlContent = rawBody.substring(startXml, endXml);

      // 2. Hàm Regex bóc tách các trường dữ liệu thiết bị
      const getTagValue = (xml, key) => {
        const regex = new RegExp(`<key>${key}<\/key>\\s*<string>([^<]+)<\/string>`);
        const match = xml.match(regex);
        return match ? match[1] : "Unknown";
      };

      const udid = getTagValue(xmlContent, "UDID");
      const deviceName = getTagValue(xmlContent, "DEVICE_NAME");
      const product = getTagValue(xmlContent, "PRODUCT");

      // 3. Tiến hành ghi dữ liệu vào cơ sở dữ liệu Cloudflare D1
      // Hãy chắc chắn bạn đã vào Pages Settings -> Functions và bind D1 với tên biến là DB
      await env.DB.prepare(
        "INSERT INTO users_udid (udid, device_name, product, created_at) VALUES (?, ?, ?, ?)"
      ).bind(udid, deviceName, product, new Date().toISOString()).run();

      // 4. Phản hồi mã 301 chuyển hướng thiết bị về trang hiển thị kết quả
      const redirectUrl = `https://tiptipios.pages.dev/result.html?udid=${udid}`;
      return new Response(null, {
        status: 301,
        headers: { "Location": redirectUrl }
      });

    } catch (error) {
      return new Response("Lỗi xử lý hệ thống: " + error.message, { status: 500 });
    }
  }

  // Nếu vô tình truy cập bằng trình duyệt thông thường (GET)
  return new Response("API hoạt động tốt. Vui lòng sử dụng file cấu hình mobileconfig trên thiết bị iOS.", { status: 200 });
}
