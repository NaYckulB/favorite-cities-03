import Head from "next/head";

export default function Pie() {
  return (
    <>
      <Head>
        <title>ASCII Art - Pie</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
            main { background: black; }
          pre {
            font-family: monospace !important;
            color: green;
            background-color: black;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto !important;
            width:180px;
            white-space: pre-wrap; /* Permite textului să se împartă pe linii */
          }
        `}</style>
      </Head>
      <main>
        <pre>
          {`
            88                      
            ""                      
8b,dPPYba,  88 ,adPPYba, 
88P'    "8a 88 a8P_____88 
88       d8 88 8PP""""""" 
88b,   ,a8" 88 "8b,   ,aa 
88\`YbbdP"'  88  \`"Ybbd8"' 
88                                                
88       

   \.,_____________,./  


          `}
        </pre>
      </main>
    </>
  );
}
