
export const Footer = () => {
    return (
        <footer className='relative flex flex-col items-center gap-4 p-8 bg-[#191919FF] text-[#F3F3F3FF]'>
          <span>Copyright &copy; 2023 KW Yeh</span>
          <div className='relative flex flex-col items-center gap-4'>
              <span>This site is created by Next v13 and React v18 for testing some interested techniques.</span>
              <a
                  className='underline text-sm'
                  href='https://github.com/kwei/indexedDBExample'
                  target="_blank"
                  rel="noreferrer noopener"
              >
                  View Source
              </a>
          </div>
        </footer>
    )
}