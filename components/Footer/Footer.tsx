import css from "./Footer.module.css";

function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Roman Anokhin</p>
          <p>
            Contact us:
            <a href="mailto:roman.anokhin.fullstack@gmail.com">
              roman.anokhin.fullstack@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
