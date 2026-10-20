import { assets, footer_data } from "../assets/assets/assets.js";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-lavender">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 py-10 border-b border-border/30 text-muted">
        <div>
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />

          <p className="max-w-[410px] mt-6 text-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-text md:mb-5 mb-2">
                {section.title}
              </h3>

              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-muted/80">
        Copyright © 2026 chandrachanukya924. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
