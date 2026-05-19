"use client";

import Link from "next/link";
import Image from "next/image";
import {
  SITE_CONFIG,
  FOOTER_LINKS_COL1,
  FOOTER_LINKS_COL2,
  FOOTER_LINKS_COL3,
  SOCIAL_LINKS,
} from "@/lib/constants";

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "facebook":
      return (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123s-.012 3.056-.06 4.122c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06s-3.056-.012-4.122-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427C2.013 15.056 2 14.716 2 12s.013-2.784.06-3.808c.049-1.064.218-1.791.465-2.427A4.902 4.902 0 013.678 3.993a4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807s.011 2.784.058 3.807c.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058s2.987-.01 4.04-.058c.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041s-.01-2.987-.058-4.041c-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
        </svg>
      );
    case "pinterest":
      return (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return null;
  }
}

function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  const style = { fontSize: 16, fontWeight: 600, color: "#E5E6E4", textDecoration: "none" as const };
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
        {label}
      </a>
    );
  }
  return <Link href={href} style={style}>{label}</Link>;
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#003366" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "120px 48px 80px" }}>
        <div className="flex flex-col lg:flex-row" style={{ gap: 56 }}>
          <div className="lg:w-[65%]" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <Image
              src={SITE_CONFIG.logoWhiteUrl}
              alt="PRISA"
              width={260}
              height={60}
              style={{ width: 260, height: "auto" }}
            />
            <div>
              <Link
                href="/red-prisa"
                style={{
                  display: "inline-block",
                  borderRadius: 9999,
                  border: "1px solid #E5E6E4",
                  padding: "10px 28px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#E5E6E4",
                  textDecoration: "none",
                }}
              >
                RED PRISA®
              </Link>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  style={{ color: "#E5E6E4" }}
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:w-[35%]">
            <p style={{ fontSize: 18, fontWeight: 600, color: "#E5E6E4", marginBottom: 20 }}>
              Servicio y atención al cliente
            </p>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              style={{ display: "block", fontSize: 16, color: "#E5E6E4", textDecoration: "none", marginBottom: 12 }}
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              style={{ display: "block", fontSize: 16, color: "#E5E6E4", textDecoration: "none" }}
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>

        <div style={{ margin: "64px 0", height: 1, backgroundColor: "rgba(229,230,228,0.3)" }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 40 }}>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {FOOTER_LINKS_COL1.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href} label={link.label} external={"external" in link ? link.external : undefined} />
              </li>
            ))}
          </ul>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            {FOOTER_LINKS_COL2.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href} label={link.label} external={"external" in link ? link.external : undefined} />
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              {FOOTER_LINKS_COL3.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
            <div style={{ paddingTop: 24 }}>
              <Image
                src="https://prisa.mx/wp-content/uploads/2025/06/prisa-badges.png"
                alt="Certificaciones PRISA"
                width={200}
                height={60}
                style={{ height: "auto", width: 200 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(229,230,228,0.2)" }}>
        <div className="flex flex-col sm:flex-row" style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 48px", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <p style={{ fontSize: 12, color: "#E5E6E4" }}>
            PRISA® Todos los derechos reservados
          </p>
          <a
            href="https://adview.mx/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: "#E5E6E4", textDecoration: "none" }}
          >
            Hecho por Adview
          </a>
        </div>
      </div>
    </footer>
  );
}
