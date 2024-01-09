import mime from "mime"
import { join } from "path"
import { stat, mkdir, writeFile } from "fs/promises"
import * as dateFn from "date-fns"
import { NextRequest, NextResponse } from "next/server"
import logger from "@utils/logger"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file0 = formData.get(`file0`) as Blob | 'undefined' | null
  const file1 = formData.get(`file1`) as Blob | 'undefined' | null
  const file2 = formData.get(`file2`) as Blob | 'undefined' | null
  const file3 = formData.get(`file3`) as Blob | 'undefined' | null
  const file4 = formData.get(`file4`) as Blob | 'undefined' | null
  const files = [file0, file1, file2, file3, file4]

  if (files[0] === 'undefined' || !files[0]) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    )
  }

  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`
  const uploadDir = join(process.cwd(), "public", relativeUploadDir)

  try {
    await stat(uploadDir)
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true })
    } else {
      logger("Error while trying to create directory when uploading a file\n", e)
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      )
    }
  }

  try {
    const urls = []
    //@ts-ignore
    const buffer0 = Buffer.from(await file0.arrayBuffer())
    const uniqueSuffix0 = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    //@ts-ignore
    const filename0 = `${file0.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix0}.${mime.getExtension(file0.type)}`
    await writeFile(`${uploadDir}/${filename0}`, buffer0)
    urls.push(`${process.env.NEXTAUTH_URL}${relativeUploadDir}/${filename0}`)

    if (files[1] && files[1] !== 'undefined') {
      //@ts-ignore
      const buffer1 = Buffer.from(await file1.arrayBuffer())
      const uniqueSuffix1 = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
      //@ts-ignore
      const filename1 = `${file1.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix1}.${mime.getExtension(file1.type)}`
      await writeFile(`${uploadDir}/${filename1}`, buffer1)
      urls.push(`${process.env.NEXTAUTH_URL}${relativeUploadDir}/${filename1}`)
    }

    if (files[2] && files[2] !== 'undefined') {
      //@ts-ignore
      const buffer2 = Buffer.from(await file2.arrayBuffer())
      const uniqueSuffix2 = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
      //@ts-ignore
      const filename2 = `${file2.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix2}.${mime.getExtension(file2.type)}`
      await writeFile(`${uploadDir}/${filename2}`, buffer2)
      urls.push(`${process.env.NEXTAUTH_URL}${relativeUploadDir}/${filename2}`)
    }

    if (files[3] && files[3] !== 'undefined') {
      //@ts-ignore
      const buffer3 = Buffer.from(await file3.arrayBuffer())
      const uniqueSuffix3 = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
      //@ts-ignore
      const filename3 = `${file3.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix3}.${mime.getExtension(file3.type)}`
      await writeFile(`${uploadDir}/${filename3}`, buffer3)
      urls.push(`${process.env.NEXTAUTH_URL}${relativeUploadDir}/${filename3}`)
    }

    if (files[4] && files[4] !== 'undefined') {
      //@ts-ignore
      const buffer4 = Buffer.from(await file4.arrayBuffer())
      const uniqueSuffix4 = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      //@ts-ignore
      const filename4 = `${file4.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix4}.${mime.getExtension(file4.type)}`
      await writeFile(`${uploadDir}/${filename4}`, buffer4)
      urls.push(`${process.env.NEXTAUTH_URL}${relativeUploadDir}/${filename4}`)
    }

    return NextResponse.json({ urls })
  } catch (e) {
    logger("Error while trying to upload a file\n", e)
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}