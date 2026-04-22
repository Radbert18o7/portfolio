// Quick script to inspect the GLB file for animations and bone names
import { readFileSync } from 'fs';

const buffer = readFileSync('./public/models/avatar.glb');
const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);

// GLB header: magic(4) + version(4) + length(4)
const magic = view.getUint32(0, true);
console.log('Magic:', magic === 0x46546C67 ? 'Valid glTF' : 'INVALID');
console.log('Version:', view.getUint32(4, true));
console.log('Total size:', (buffer.byteLength / 1024 / 1024).toFixed(2), 'MB');

// First chunk is JSON
const jsonChunkLen = view.getUint32(12, true);
const jsonChunkType = view.getUint32(16, true);
const jsonStr = new TextDecoder().decode(buffer.subarray(20, 20 + jsonChunkLen));
const gltf = JSON.parse(jsonStr);

// Animations
console.log('\n=== ANIMATIONS ===');
if (gltf.animations && gltf.animations.length > 0) {
  gltf.animations.forEach((anim, i) => {
    console.log(`  [${i}] name: "${anim.name || '(unnamed)'}", channels: ${anim.channels?.length || 0}, samplers: ${anim.samplers?.length || 0}`);
  });
} else {
  console.log('  No animations found.');
}

// Skins (skeleton)
console.log('\n=== SKINS (Skeletons) ===');
if (gltf.skins && gltf.skins.length > 0) {
  gltf.skins.forEach((skin, i) => {
    console.log(`  [${i}] name: "${skin.name || '(unnamed)'}", joints: ${skin.joints?.length || 0}`);
  });
} else {
  console.log('  No skins found.');
}

// Nodes (bones)
console.log('\n=== KEY NODES (bones/armature) ===');
if (gltf.nodes) {
  const boneKeywords = ['hips', 'spine', 'arm', 'leg', 'shoulder', 'hand', 'head', 'neck', 'foot', 'elbow', 'knee', 'wrist', 'finger', 'thumb', 'chest', 'clavicle', 'root', 'armature', 'mixamo'];
  gltf.nodes.forEach((node, i) => {
    const name = (node.name || '').toLowerCase();
    if (boneKeywords.some(k => name.includes(k))) {
      console.log(`  [${i}] "${node.name}"${node.rotation ? ' rot:' + JSON.stringify(node.rotation.map(v => +v.toFixed(3))) : ''}${node.translation ? ' pos:' + JSON.stringify(node.translation.map(v => +v.toFixed(3))) : ''}`);
    }
  });
}

console.log('\n=== ALL TOP-LEVEL NODE NAMES ===');
if (gltf.nodes) {
  gltf.nodes.forEach((node, i) => {
    console.log(`  [${i}] "${node.name || '(unnamed)'}"`);
  });
}
