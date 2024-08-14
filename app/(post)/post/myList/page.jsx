export default function myList() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">cos's Blog</h1>

      {/* First Blog Post */}
      <div className="flex flex-row mb-8 border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
        {/* <Image
          src="/fs.png" // 이 이미지는 public 디렉토리에 넣어야 함
          alt="post image"
          width={500}
          height={300}
          className="w-full"
        /> */}
        <div>ddddddddddddd</div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">fs</h2>
          <p className="text-gray-600 mb-4">2024-08-14 (10:08)</p>
          <p className="text-gray-800 mb-4">dssaz</p>
          <button className="bg-green-500 text-white py-2 px-4 rounded">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
