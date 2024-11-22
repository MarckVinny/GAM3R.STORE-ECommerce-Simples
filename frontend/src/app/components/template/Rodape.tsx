import Link from 'next/link'
import Logo from '../shared/Logo'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandYoutube,
} from '@tabler/icons-react'

export default function Rodape() {
  return (
    <footer className="flex flex-col bg-black/30 text-zinc-400 mt-10">
      <div className="h-px bg-gradient-to-r from-violet-600/20 via-violet-600/80 to-violet-600/30"></div>
      <div className="flex flex-col container py-10 gap-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between text-center md:text-left gap-5 md:gap-0">
          <Logo />
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold text-zinc-200 pb-2">Sobre</span>
            <Link href="/nossa-historia" className="text-sm hover:underline">
              Nossa História
            </Link>
            <Link
              href="/politica-de-privacidade"
              className="text-sm hover:underline"
            >
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="text-sm hover:underline">
              termos de Uso
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold text-zinc-200 pb-2">
              Contato
            </span>
            <a
              href="mailto:suport@gam3r.store"
              className="text-sm hover:underline"
            >
              suporte@gam3r.store
            </a>
            <a
              href="https://wa.me/5521000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex text-sm items-center gap-2 hover:underline"
            >
              <IconBrandWhatsapp size={20} className="text-green-500" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-1.5 justify-between">
          <div className="flex gap-2">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandYoutube
                size={28}
                stroke={1}
                className="hover:text-white"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandInstagram
                size={28}
                stroke={1}
                className="hover:text-white"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandFacebook
                size={28}
                stroke={1}
                className="hover:text-white"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandLinkedin
                size={28}
                stroke={1}
                className="hover:text-white"
              />
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-1.5 text-sm text-zinc-500">
            <div className="flex gap-1.5">
              <span>feito com</span>
              <span> ❤️ </span>
              <span>em {new Date().getFullYear()}</span>
            </div>
            <span className="hidden md:inline-block">-</span>
            <span>Todos os direitos reservados</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
