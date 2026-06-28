import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <p className="font-semibold text-gray text-xs">
            Copright @ {new Date().getFullYear()} Apple Inc. All rights
            reserved.
          </p>
          <div className="flex">
            {footerLinks.map((link, i) => (
              <a
                key={link}
                href="#"
                className="font-semibold text-gray text-xs"
              >
                {link}{" "}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2"> | </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
