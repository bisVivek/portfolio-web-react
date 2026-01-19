const fs = require('fs');
const path = require('path');

// Create a minimal valid GLB file with a simple box
function createMinimalGLB() {
  // GLB Header: magic (glTF), version (2), total length (will be calculated)
  const magic = 0x46546C67; // "glTF"
  const version = 2;
  
  // Scene JSON
  const scene = {
    asset: { version: "2.0" },
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [{
      primitives: [{
        attributes: { POSITION: 0 },
        indices: 1
      }]
    }],
    accessors: [
      {
        bufferView: 0,
        componentType: 5126, // FLOAT
        count: 8,
        type: "VEC3",
        max: [1, 1, 1],
        min: [-1, -1, -1]
      },
      {
        bufferView: 1,
        componentType: 5123, // UNSIGNED_SHORT
        count: 36,
        type: "SCALAR"
      }
    ],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: 96 },
      { buffer: 0, byteOffset: 96, byteLength: 72 }
    ],
    buffers: [{ byteLength: 168 }]
  };
  
  const jsonStr = JSON.stringify(scene);
  const jsonPadded = jsonStr + ' '.repeat(4 - (jsonStr.length % 4));
  const jsonBytes = Buffer.from(jsonPadded, 'utf8');
  
  // Box vertices (8 vertices * 3 floats * 4 bytes = 96 bytes)
  const vertices = Buffer.allocUnsafe(96);
  const v = [-1,-1,-1, 1,-1,-1, 1,1,-1, -1,1,-1, -1,-1,1, 1,-1,1, 1,1,1, -1,1,1];
  for (let i = 0; i < v.length; i++) {
    vertices.writeFloatLE(v[i], i * 4);
  }
  
  // Box indices (12 triangles * 3 indices * 2 bytes = 72 bytes)
  const indices = Buffer.allocUnsafe(72);
  const idx = [0,1,2, 0,2,3, 4,7,6, 4,6,5, 0,4,5, 0,5,1, 1,5,6, 1,6,2, 2,6,7, 2,7,3, 3,7,4, 3,4,0];
  for (let i = 0; i < idx.length; i++) {
    indices.writeUInt16LE(idx[i], i * 2);
  }
  
  const binary = Buffer.concat([vertices, indices]);
  
  // Calculate lengths
  const jsonChunkLength = jsonBytes.length;
  const binChunkLength = binary.length;
  const totalLength = 12 + 8 + jsonChunkLength + 8 + binChunkLength;
  
  // Create GLB
  const header = Buffer.allocUnsafe(12);
  header.writeUInt32LE(magic, 0);
  header.writeUInt32LE(version, 4);
  header.writeUInt32LE(totalLength, 8);
  
  const jsonChunkHeader = Buffer.allocUnsafe(8);
  jsonChunkHeader.writeUInt32LE(jsonChunkLength, 0);
  jsonChunkHeader.writeUInt32LE(0x4E4F534A, 4); // "JSON"
  
  const binChunkHeader = Buffer.allocUnsafe(8);
  binChunkHeader.writeUInt32LE(binChunkLength, 0);
  binChunkHeader.writeUInt32LE(0x004E4942, 4); // "BIN\0"
  
  const glb = Buffer.concat([header, jsonChunkHeader, jsonBytes, binChunkHeader, binary]);
  
  // Write file
  const outputPath = path.join(__dirname, 'src', 'assets', 'lanyard', 'card.glb');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, glb);
  console.log('Created minimal GLB file at:', outputPath);
}

createMinimalGLB();

