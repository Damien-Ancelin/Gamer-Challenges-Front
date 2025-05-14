export default function FooterMobile() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} Gamer Challenges</p>
    </footer>
  );
}
