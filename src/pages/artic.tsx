import { prisma } from "../server/db/client"; // 确保路径正确

// 定义 Blog 数据的类型
interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

// 使用 getServerSideProps 获取数据
export async function getServerSideProps() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogs)), // 将数据传递给页面
    },
  };
}

// 页面组件
const ArticPage = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">博客列表</h1>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600 mt-2">{blog.content}</p>
            <div className="text-sm text-gray-500 mt-2">
              {new Date(blog.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticPage; 