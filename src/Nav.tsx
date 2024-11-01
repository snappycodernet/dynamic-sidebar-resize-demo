import { useEffect, useRef, useState } from 'react'
import './Nav.css'

const DEFAULT_NAV_WIDTH = '40vw'

const Nav = () => {
  const navbarRef = useRef<HTMLElement>(null)
  const gripperRef = useRef<HTMLDivElement>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [navWidth, setNavWidth] = useState(DEFAULT_NAV_WIDTH)

  useEffect(() => {
    gripperRef?.current?.addEventListener('mousedown', (e) => {
        document.addEventListener('mousemove', resizeSidebar);
        document.addEventListener('mouseup', stopResizing);
    });

    () => {
      document.removeEventListener('mousemove', resizeSidebar);
      document.removeEventListener('mouseup', stopResizing);
    }
  }, [gripperRef, navbarRef, isResizing])

  const resizeSidebar = (e: any) => {
    setIsResizing(true)

    const newWidth = e.clientX;

    setNavWidth(newWidth)
  }

  const stopResizing = () => {
    setIsResizing(false)

    document.removeEventListener('mousemove', resizeSidebar);
    document.removeEventListener('mouseup', stopResizing);
  }

  const resetNavWidth = () => {
    setNavWidth(DEFAULT_NAV_WIDTH)
  }

  return (
    <nav style={{ width: navWidth }}>
      <div>Nav Item 1</div>
      <div>Nav Item 2</div>
      <div>Nav Item 3</div>
      <div>Nav Item 4</div>
      <div>Nav Item 5</div>
      <div>Nav Item 6</div>
      <button onClick={resetNavWidth}>Reset</button>
      <div className='nav-gripper-container'>
        <div ref={gripperRef} className='nav-gripper'></div>
      </div>
    </nav>
  )
}

export default Nav