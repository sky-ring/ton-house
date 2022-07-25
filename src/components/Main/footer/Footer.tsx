import Link from 'next/link';
import React, { useState } from 'react';

import { GitHub, Twitter } from '@/components/icons/socials';
import styles from '@/styles/main/footer.module.scss';
import { AppConfig } from '@/utils/AppConfig';

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
};

function SocialLink(props: SocialLinkProps) {
  return (
    <Link passHref href={props.href}>
      <a role="social">{props.icon}</a>
    </Link>
  );
}

export default function Footer() {
  const [year] = useState(new Date().getFullYear());
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright} role="copyright">
        Copyright © {year} - {AppConfig.site_name}
      </div>
      <div className={styles.socials}>
        <SocialLink href="https://twitter.com" icon={<Twitter />} />
        <SocialLink
          href="https://github.com/shayan-shojaei/ton-status"
          icon={<GitHub />}
        />
      </div>
    </footer>
  );
}
