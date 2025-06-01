This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# 非Next.js默认文档

## Website Overview
![Home Page.png](public/demo%20pictures/Home%20Page.png)
![Login Page.png](public/demo%20pictures/Login%20Page.png)
![Edit Note Page.png](public/demo%20pictures/Edit%20Note%20Page.png)

保存的用户和笔记信息可以用Prisma Studio查看和管理

```
> npx prisma studio
```
![Prisma Studio Users.png](public/demo%20pictures/Prisma%20Studio%20Users.png)
![Prisma Studio Notes.png](public/demo%20pictures/Prisma%20Studio%20Notes.png)

## AI辅助开发要点
1. 技术栈选择
   + 语言：TypeScript✅
   + 网页：Tailwind CSS✅
   + 前端框架：Next.js✅
   + 数据库：PostgreSQL + Prisma ORM✅
   + 身份与会话：bcryptjs + JWT + HttpOnly Cookie ✅
2. 功能设计
   + 用户注册与登录与全局用户状态管理
   + JWT 认证及会话管理
   + 创建\编辑\删除笔记
   + 加密的密码与笔记存储

# Next.js默认文档

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
