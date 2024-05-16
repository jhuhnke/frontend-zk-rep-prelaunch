import React, { forwardRef } from 'react';

const Features = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="w-full flex flex-col items-center justify-center text-center p-4 pt-8 pb-8" style={{ 
      background: "linear-gradient(to top, rgba(224, 195, 252, 0.7) 0%, rgba(255, 255, 255, 0.7) 100%)"
    }}>
      <div className="content">
        <h2 className='mb-4 max-w-lg font-bold mx-auto text-xl' style={{ color: '#ff5467'}}>Features</h2>
        <h1 className="text-6xl font-bold mb-8" style={{ color: '#312e81' }}>Our Powerful Features</h1>
        {/* Feature Boxes Container */}
        <div className="grid grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {/* Feature Box 1 */}
          <div className="feature-box flex flex-col p-8 rounded-3xl shadow-lg bg-white border-2 border-purple-800 min-h-[300px] text-left">
            <img src="creditcard.png" alt="Credit Card" className="w-50 h-50 mb-4 flex-shrink-0"/>
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold text-purple-800 mb-2">Credit Scores</h3>
              <p>Manage your account settings and configurations efficiently.</p>
            </div>
          </div>
          {/* Feature Box 2 */}
          <div className="feature-box flex flex-col p-8 rounded-3xl shadow-lg bg-white border-2 border-purple-800 min-h-[300px] text-left">
            <img src="money.png" alt="Money" className="w-50 h-50 mb-4 flex-shrink-0"/>
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold text-purple-800 mb-2">KYC Credentials</h3>
              <p>Execute trades quickly and securely with state-of-the-art technology.</p>
            </div>
          </div>
          {/* Feature Box 3 */}
          <div className="feature-box flex flex-col p-8 rounded-3xl shadow-lg bg-white border-2 border-purple-800 min-h-[300px] text-left">
            <img src="data.png" alt="Data" className="w-50 h-50 mb-4 flex-shrink-0"/>
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold text-purple-800 mb-2">On-Chain Organizations</h3>
              <p>Access comprehensive analytics and reports to make informed decisions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Features;