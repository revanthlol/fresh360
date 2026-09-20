export { metadata, viewport } from 'next-sanity/studio'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-[2000] w-screen h-screen overflow-hidden bg-white">
      {children}
    </div>
  )
}
