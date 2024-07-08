import Link from "next/link"

interface FooterProps{
    description:string
    textLink:string
    link: string
}
export function Footer({description,textLink,link}: FooterProps){
return(
    <div className="w-full flex justify-center mt-3">
        <span className="text-[12px]">
            {description}{" "}
            <Link className="font-bold text-primary" href={link}>
                {textLink}
            </Link>
        </span>
    </div>
)

}
