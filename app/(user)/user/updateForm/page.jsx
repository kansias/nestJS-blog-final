export default async function UpdateForm() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://via.placeholder.com/80"
            alt="profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <p className="mt-4 text-lg font-semibold">ssar</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm">기존 비밀번호</label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
                ★
              </span>
            </div>
          </div>
          <div>
            <label className="block text-gray-600 text-sm">수정 비밀번호</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            {/* TODO : 개발자 모드에서 이메일 value값 변경 되니까 서버에서 막아야함  */}
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value="ssar@nate.com"
              readOnly
            />
          </div>
        </div>
        <button
          className="w-full mt-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        >
          회원정보수정
        </button>
        <div className="flex justify-between mt-4 text-sm text-blue-500">
          <a href="#" className="hover:underline">
            로그인
          </a>
          <a href="#" className="hover:underline">
            비밀번호 찾기
          </a>
        </div>
      </div>
    </div>
  );
}
