import { Card } from "@/components/ui/card"
import { Marquee } from "@/components/shadcn-space/animations/marquee"
import { Certificate } from "@/lib/portfolio-data"

type VideoItem = {
  title: string
  video: string
}

const BASE_URL = "https://images.shadcnspace.com/assets/marquee"

const videos: VideoItem[] = [
  { title: "Video 1", video: `${BASE_URL}/marquee-1.mp4` },
  { title: "Video 2", video: `${BASE_URL}/marquee-2.mp4` },
  { title: "Video 3", video: `${BASE_URL}/marquee-3.mp4` },
  { title: "Video 4", video: `${BASE_URL}/marquee-4.mp4` },
  { title: "Video 5", video: `${BASE_URL}/marquee-5.mp4` },
]

const VideoCard = ({ name, image }: Certificate) => {
  return (
    <Card className="h-117.5  shrink-0 overflow-hidden p-0 shadow-none">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </Card>
  )
}

interface props {
  certificate: Certificate[]
}

const VideoMarqueeDemo = ({ certificate }: props) => {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:30s] [--gap:1.5rem]">
        {certificate.map(({ name, image }) => (
          <VideoCard key={name} name={name} image={image} />
        ))}
      </Marquee>
    </div>
  )
}

export default VideoMarqueeDemo
