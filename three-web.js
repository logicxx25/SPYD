document.addEventListener('DOMContentLoaded', function() {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('cobweb-container').appendChild(renderer.domElement);

    // Create cobweb geometry
    const cobwebGroup = new THREE.Group();
    scene.add(cobwebGroup);

    // Create random connection points
    const points = [];
    const pointCount = 30;
    for (let i = 0; i < pointCount; i++) {
        points.push(new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        ));
    }

    // Create strands between points
    const material = new THREE.LineBasicMaterial({ 
        color: 0xcccccc,
        transparent: true,
        opacity: 0.3
    });

    // Connect each point to several others
    points.forEach((point, index) => {
        // Connect to 3-5 other random points
        const connections = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < connections; i++) {
            const targetIndex = Math.floor(Math.random() * pointCount);
            if (targetIndex !== index) {
                const geometry = new THREE.BufferGeometry().setFromPoints([point, points[targetIndex]]);
                const line = new THREE.Line(geometry, material);
                cobwebGroup.add(line);
            }
        }
    });

    // Add some random spiders
    const spiderGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const spiderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    for (let i = 0; i < 5; i++) {
        const spider = new THREE.Mesh(spiderGeometry, spiderMaterial);
        spider.position.copy(points[Math.floor(Math.random() * pointCount)]);
        cobwebGroup.add(spider);
    }

    // Position camera
    camera.position.z = 15;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Slight movement to points
        cobwebGroup.children.forEach(child => {
            if (child.isLine) {
                const positions = child.geometry.attributes.position.array;
                // Add subtle movement to endpoints
                positions[0] += (Math.random() - 0.5) * 0.01;
                positions[1] += (Math.random() - 0.5) * 0.01;
                positions[2] += (Math.random() - 0.5) * 0.01;
                positions[3] += (Math.random() - 0.5) * 0.01;
                positions[4] += (Math.random() - 0.5) * 0.01;
                positions[5] += (Math.random() - 0.5) * 0.01;
                child.geometry.attributes.position.needsUpdate = true;
            }
        });

        // Slow rotation
        cobwebGroup.rotation.y += 0.001;
        cobwebGroup.rotation.x += 0.0005;

        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
});
