export default function SubList() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">구독 중인 블로그</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 shadow-sm flex justify-between items-start bg-white">
            <div>
              <h3 className="text-xl font-bold mb-2">love 블로그</h3>
              <p className="text-red-500 text-sm mb-1">
                [최신글] 요즘 인기 있는 드라마!! "굿파트너"
              </p>
              <p className="text-red-500 text-sm mb-1">
                [최신글] "오타쿠의 사랑" 리뷰
              </p>
            </div>
            <button className="bg-red-500 text-white py-1 px-4 rounded">
              구독취소
            </button>
          </div>

          <div className="border rounded-lg p-4 shadow-sm flex justify-between items-start bg-white">
            <div>
              <h3 className="text-xl font-bold mb-2">vivi 블로그</h3>
              <p className="text-red-500 text-sm mb-1">
                [최신글] 효율적인 디버깅을 위한 팁
              </p>
              <p className="text-red-500 text-sm mb-1">
                [최신글] 코드 리팩토링: 잘못된 코드 수정하기
              </p>
            </div>
            <button className="bg-red-500 text-white py-1 px-4 rounded">
              구독취소
            </button>
          </div>

          <div className="border rounded-lg p-4 shadow-sm flex justify-between items-start bg-white">
            <div>
              <h3 className="text-xl font-bold mb-2">cos 블로그</h3>
              <p className="text-red-500 text-sm mb-1">
                [최신글] 전라도 맛집 여행: 여수 편
              </p>
              <p className="text-red-500 text-sm mb-1">
                [최신글] 전라도 맛집 여행: 전주 편
              </p>
            </div>
            <button className="bg-red-500 text-white py-1 px-4 rounded">
              구독취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
