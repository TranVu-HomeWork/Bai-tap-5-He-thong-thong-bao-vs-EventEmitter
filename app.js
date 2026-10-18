const { EventEmitter } = require('events');

// 2. Tạo class OrderService kế thừa từ EventEmitter
class OrderService extends EventEmitter {
    constructor() {
        super(); // Bắt buộc gọi super() để kế thừa các phương thức của EventEmitter
        
        // 3. Đăng ký sự kiện dùng .once() (Chỉ chạy đúng 1 lần duy nhất)
        this.once('order:created', () => {
            console.log('[SYSTEM] Đơn hàng đầu tiên đã được khởi tạo trong hệ thống');
        });

        // 4. Đăng ký sự kiện dùng .on() (Chạy mỗi khi có sự kiện emit)
        this.on('order:created', (order) => {
            console.log(`[EMAIL] Đã gửi email xác nhận cho đơn hàng #${order.id}`);
        });
    }
}

// 5. Viết code test
const service = new OrderService();

// Tạo mảng 3 đơn hàng mẫu theo yêu cầu
const testOrders = [
    { id: 1, total: 100000 },
    { id: 2, total: 250000 },
    { id: 3, total: 75000 }
];

// 6. Emit tuần tự các đơn hàng
console.log('--- BẮT ĐẦU TẠO ĐƠN HÀNG ---');
testOrders.forEach(order => {
    // Phát ra sự kiện 'order:created' kèm theo dữ liệu đơn hàng
    service.emit('order:created', order);
});
console.log('--- KẾT THÚC ---');