import Header from "@/component/็Header"

export default function TeamPage() {
    return (
        <div>
            <header className="bg-blue-600 text-white py-4 shadow-md ">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold">ร้านหนังสือของคนข้างทาง</h1>
                </div>
            </header>
            
            <div className="max-w-2xl mx-auto mt-12 px-4">
                <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
                    ทีมผู้พัฒนา (Team Service)
                </h1>
                <div className="bg-white shadow-md rounded p-6 space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold">ชื่อทีม:</h2>
                        <p>BookSideWalk Dev Team</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">ติดต่อเรา:</h2>
                        <ul className="list-disc ml-6">
                            <li>อีเมล: contact@booksidewalk.dev</li>
                            <li>เบอร์โทร: 063-093-1464</li>
                            <li>Line ID: @bookteam</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">ที่อยู่:</h2>
                        <p>มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต, คณะวิทยาศาสตร์</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
