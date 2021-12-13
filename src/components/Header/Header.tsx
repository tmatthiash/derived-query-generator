import "./Header.css";

export const Header = () => {
  return (
    <header>
      <h1 className="header-primary-text">JPA Derived Query Generator</h1>
      <h4 className="header-secondary-text">
        Builds named queries for JPA repositories
      </h4>
    </header>
  );
};
