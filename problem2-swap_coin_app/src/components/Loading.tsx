export const LoadingSpinner: React.FC = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='relative flex items-center justify-center'>
        <div className='absolute h-20 w-20 animate-ping rounded-full bg-gradient-to-r from-purple-500 via-blue-400 to-purple-500 opacity-20 blur-xl'></div>
        <div className='h-16 w-16 animate-spin rounded-full border-4 border-b-white border-t-transparent border-t-white border-opacity-30'></div>
      </div>
    </div>
  )
}
