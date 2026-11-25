# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Thông báo đặt xe qua Zalo

1. Mở Zalo, tìm **Zalo Bot Manager**, chọn **Tạo bot**, rồi lưu Bot Token vào biến `ZALO_BOT_TOKEN` trong tệp `.env.local` cục bộ. [Hướng dẫn tạo bot](https://docs.zaloplatforms.com/docs/BOT/create_bot).
2. Từ tài khoản Zalo sẽ nhận thông báo, nhắn một tin vào cuộc trò chuyện với bot. Chạy `npm run zalo:chat-id` và lấy `ZALO_CHAT_ID` từ kết quả. Nếu dùng nhóm, thêm bot vào nhóm được phép nhận và chạy lệnh sau khi có tin nhắn mà bot nhận được trong nhóm. [Tài liệu getUpdates](https://docs.zaloplatforms.com/docs/BOT/apis/getUpdates).
3. Thêm `ZALO_BOT_TOKEN` và `ZALO_CHAT_ID` trong **Vercel → Project → Settings → Environment Variables** rồi triển khai lại. Với bản chạy cục bộ, có thể thêm cả hai biến vào `.env.local` và khởi động lại Vite.

Đơn đặt xe được lưu vào hệ thống quản lý trên Cloudflare trước khi gửi thông báo. Nếu gửi Zalo thất bại, đơn đã lưu vẫn xuất hiện trong trang quản trị và nhật ký Vercel ghi lại mã đơn. Form Liên hệ báo đã gửi sau khi Zalo chấp nhận tin nhắn. `ORDER_API_URL` có thể trỏ sang API thử nghiệm khi chạy cục bộ. [Tài liệu sendMessage](https://docs.zaloplatforms.com/docs/BOT/apis/sendMessage).
