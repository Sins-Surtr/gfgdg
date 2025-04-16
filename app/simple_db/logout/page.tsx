import STYLE from '@/constants/style'
import { logoutUser } from '@/utils/loginUser' 

export default function Page() {
  return (
    <div>
      <button 
        className={STYLE}
        onClick={logoutUser}>Logout</button>
    </div>
  )
}