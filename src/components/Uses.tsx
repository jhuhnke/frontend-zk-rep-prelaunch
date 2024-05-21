import React, { forwardRef } from 'react'; 

const Uses = forwardRef<HTMLDivElement>((props, ref) => {
    return(
        <div ref={ref} className="w-full flex flex-col bg-gradient-radial-2 items-center justify-center text-center p-4 pt-8 pb-8">
                <div className='content mt-12'>
                    <div className='content w-full'>
                    <h2 className='mb-4 max-w-lg font-bold mx-auto text-xl' style={{ color: '#ff5467'}}>Use Cases</h2>

                    {/* Use Case 1 */}
                    <div className="flex w-full items-center justify-between px-12 mt-12 mb-12">
                        <div className="use-case-container flex-1 text-left flex flex-col justify-center">
                            <h1 className="text-6xl font-bold mb-4" style={{ color: '#312e81' }}>Stay Compliant In An Ever Changing Regulatory Landscape</h1>
                            <p>Navigate regulatory complexities with ease by leveraging cutting-edge blockchain technology to ensure your organization remains compliant and agile in an ever-changing landscape.</p>
                        </div>
                        <div className="blank-card flex-1 bg-white shadow-lg border-2 border-purple-800 rounded-3xl p-6" style={{
                            minHeight: '400px',
                            background: `
                                radial-gradient(circle at bottom left, #ffffff, #fe908a, #fef8fe) no-repeat,
                                radial-gradient(circle at bottom right, #ffffff, #fedfa6) no-repeat
                            `,
                            backgroundSize: '100% 100%',
                            marginLeft: '8rem',
                            position: 'relative', 
                        }}>
                            {/* Image inside the div */}
                            <img src="/regulations.png" alt="Descriptive Alt Text" style={{
                                position: 'absolute',
                                top: '5%', bottom: '5%', left: '5%', right: '5%',
                                borderRadius: '20px',
                                width: '85%', 
                                height: '80%', 
                                objectFit: 'cover', 
                                margin: 'auto', 
                                display: 'block'   
                            }}/>
                        </div>
                    </div>
                

                    {/* Use Case 2 */}
                    <div className="use-case-container mt-12 mb-12">
                        <div className="flex w-full items-center justify-between px-12">
                            <div className="blank-card flex-1 bg-white shadow-lg border-2 border-purple-800 rounded-3xl p-6" style={{
                                    minHeight: '400px',
                                    background: `
                                        radial-gradient(circle at bottom left, #b387f5, #c0c3f7, #ffffff) no-repeat,
                                        radial-gradient(circle at bottom right, #fe908a, #ffffff) no-repeat
                                    `,
                                    backgroundSize: '100% 100%',
                                    marginRight: '8rem', 
                                    position: 'relative', 
                                }}>

                            <img src="/community.png" alt="Community" style={{
                                position: 'absolute',
                                top: '5%', bottom: '5%', left: '5%', right: '5%',
                                borderRadius: '20px',
                                width: '85%', 
                                height: '80%', 
                                objectFit: 'cover', 
                                margin: 'auto', 
                                display: 'block'   
                            }}/>
                                    
                            </div>
                            <div className="use-case-container flex-1 text-left flex flex-col justify-center">
                                <h1 className="text-6xl font-bold mb-4" style={{ color: '#312e81' }}>Building Community Fully On-Chain</h1>
                                <p>Foster a vibrant, transparent, and engaged community by leveraging fully on-chain solutions for seamless collaboration and governance.</p>
                            </div>
                        </div>
                    </div>

                    {/* Use Case 3 */}
                    <div className="flex w-full items-center justify-between px-12">
                        <div className="use-case-container flex-1 text-left flex flex-col justify-center mt-12 mb-12">
                            <h1 className="text-6xl font-bold mb-4" style={{ color: '#312e81' }}>Access Larger Loans And Trade RWAs</h1>
                            <p>Unlock the potential for larger loans and seamless trading of real-world assets through the power of decentralized finance and blockchain technology.</p>
                        </div>
                        <div className="blank-card flex-1 bg-white shadow-lg border-2 border-purple-800 rounded-3xl p-6" style={{
                            minHeight: '400px',
                            background: `
                                radial-gradient(circle at bottom center, #ffffff, #fe908a, #fef8fe) no-repeat,
                                radial-gradient(circle at top right, #fe908a, #fedfa6) no-repeat
                            `,
                            backgroundSize: '100% 100%',
                            marginLeft: '8rem', 
                            position: 'relative', 
                            overflow: 'hidden'
                        }}>
                            <img src="/loan.png" alt="Descriptive Alt Text" style={{
                                position: 'absolute',
                                top: '5%', bottom: '5%', left: '5%', right: '5%',
                                borderRadius: '20px',
                                width: '85%', 
                                height: '80%', 
                                objectFit: 'cover', 
                                margin: 'auto', 
                                display: 'block'  
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}); 

export default Uses; 