import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="mb-40">
        <div className="px-6 py-12 lg:my-12 md:px-12 text-gray-800 text-center lg:text-left">
          <div className="container mx-auto xl:px-32">
            <div className="lg:grid-cols-2 gap-12 flex items-center">
              <div className="mt-12 lg:mt-0">
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-12">
                  Split bills <br />
                  <span className="text-primary">the easy way</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
