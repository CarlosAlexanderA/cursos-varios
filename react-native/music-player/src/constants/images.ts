import unknownArtistImage from "@/assets/unknown_artist.png"
import unknownTrachImage from "@/assets/unknown_track.png"
import { Image } from "react-native"

export const unknownTrachUri = Image.resolveAssetSource(unknownTrachImage).uri
export const unknownArtistUri = Image.resolveAssetSource(unknownArtistImage).uri
