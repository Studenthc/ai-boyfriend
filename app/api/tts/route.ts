import { NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

let client: TextToSpeechClient;

try {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}');
  client = new TextToSpeechClient({ credentials });
} catch (error) {
  console.error('Error initializing TextToSpeechClient:', error);
}

export async function POST(req: Request) {
    if (!client) {
      console.error('TTS client not initialized');
      return NextResponse.json({ error: 'TTS client not initialized' }, { status: 500 });
    }
  
    const { text } = await req.json();
    console.log('Received text for TTS:', text);
  
    try {
      const [response] = await client.synthesizeSpeech({
        input: { text },
        voice: { languageCode: 'en-US', ssmlGender: 'MALE' },
        audioConfig: { audioEncoding: 'LINEAR16' },
      });
  
      const audioContent = response.audioContent;
      
      if (!audioContent) {
        console.error('No audio content received from TTS API');
        throw new Error('Failed to synthesize speech');
      }
  
      console.log('Audio content received, length:', audioContent.length);
  
      return new NextResponse(audioContent, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
        },
      });
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      return NextResponse.json({ error: 'Failed to synthesize speech' }, { status: 500 });
    }
  }