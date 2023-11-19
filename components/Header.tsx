/*
 * React Component for Global Header. we use tailwind for styling
 * the Header component is on the top of the page with black background
 * it has width of 100% and height of 60px
 */
const Header = () => {
  return (
    <div className="navbar bg-black ">
      <div className="flex-1">
        <div className="text-white text-2xl ml-4">GitHub OSS Founder</div>
      </div>
      <div className="flex items-center">
        <div className="text-white mr-4">Home</div>
        <div className="text-white mr-4">About</div>
        <div className="text-white mr-4">Contact</div>
      </div>
    </div>
  )
}

export default Header
