import { useState } from 'react'

// 1. 초기 더미 도서 데이터 정의
const initialBooks = [
  { id: 1, title: '리액트 교과서', author: '구경', year: 2024, genre: '프로그래밍', available: true },
  { id: 2, title: 'AWS로 시작하는 클라우드', author: '안혜란', year: 2023, genre: '클라우드', available: true },
  { id: 3, title: 'CI/CD 마스터 클래스', author: '유제현', year: 2025, genre: '데브옵스', available: false }, // 대출 불가능 상태
  { id: 4, title: 'Node.js 백엔드 완정 정복', author: '박서준', year: 2022, genre: '프로그래밍', available: true },
  { id: 5, title: '생성형 AI 활용법', author: '김지아', year: 2024, genre: 'AI', available: true },
];

function App() {
  // 2. 상태(State) 관리
  const [books, setBooks] = useState(initialBooks); // 전체 도서 목록 상태
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태

  // 3. 기능 구현: 대출/반납 처리 함수
  // 특정 도서의 ID를 받아 available 상태를 반전시킵니다.
  const toggleLoanStatus = (id) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id ? { ...book, available: !book.available } : book
      )
    );
  };

  // 4. 기능 구현: 검색 필터링 로직
  // 원본 books 배열은 건드리지 않고, 화면에 보여줄 필터링된 배열만 생성합니다.
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* 간단한 인라인 스타일 */}
      <style>{`
        .app-container { font-family: sans-serif; max-width: 800px; margin: 20px auto; padding: 20px; }
        .header { text-align: center; color: #333; margin-bottom: 30px; }
        .search-bar { width: 100%; padding: 12px; font-size: 16px; border: 2px solid #ddd; border-radius: 8px; margin-bottom: 20px; box-sizing: border-box; }
        .search-bar:focus { border-color: #007bff; outline: none; }
        .book-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
        .book-card { border: 1px solid #eee; border-radius: 10px; padding: 20px; background-color: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.05); transition: transform 0.2s; }
        .book-card:hover { transform: translateY(-5px); }
        .book-title { margin: 0 0 10px 0; font-size: 18px; color: #007bff; }
        .book-info { margin: 5px 0; color: #666; font-size: 14px; }
        .status-badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-top: 10px; }
        .status-available { background-color: #d4edda; color: #155724; }
        .status-unavailable { background-color: #f8d7da; color: #721c24; }
        .action-btn { width: 100%; margin-top: 15px; padding: 10px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; transition: background-color 0.2s; }
        .btn-borrow { background-color: #28a745; color: white; }
        .btn-borrow:hover { background-color: #218838; }
        .btn-return { background-color: #ffc107; color: #212529; }
        .btn-return:hover { background-color: #e0a800; }
        .no-result { text-align: center; grid-column: 1 / -1; color: #999; margin-top: 50px; }
      `}</style>

      <div className="app-container">
        <h1 className="header">미니 도서 대출 시스템</h1>

        {/* 5. 검색 입력창 (UI) */}
        <input
          type="text"
          className="search-bar"
          placeholder="도서 제목 또는 저자 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 입력할 때마다 searchTerm 상태 업데이트
        />

        {/* 6. 도서 목록 렌더링 (UI) */}
        <div className="book-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <div key={book.id} className="book-card">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-info">저자: {book.author}</p>
                <p className="book-info">출판: {book.year}년 | 장르: {book.genre}</p>
                
                {/* 대출 가능 상태 표시 */}
                <span className={`status-badge ${book.available ? 'status-available' : 'status-unavailable'}`}>
                  {book.available ? '비치중 (대출가능)' : '대출중'}
                </span>

                {/* 7. 대출/반납 버튼 (UI 및 로직 연결) */}
                <button 
                  className={`action-btn ${book.available ? 'btn-borrow' : 'btn-return'}`}
                  onClick={() => toggleLoanStatus(book.id)}
                >
                  {book.available ? '대출하기' : '반납하기'}
                </button>
              </div>
            ))
          ) : (
            // 검색 결과가 없을 때
            <div className="no-result">
              <h3>검색 결과가 없습니다.</h3>
              <p>다른 검색어를 입력해 보세요.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App