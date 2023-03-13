import Fastify from 'fastify'
import stream from 'stream';

const fastify = Fastify({
	logger: true
});

fastify.get('/', function (request, reply) {
	var buffer = new stream.Readable();
	buffer._read = ()=>{};

	// Generate 5 chunks with 1 second interval
	var count = 5;
	var emit = () => {
		var data = `Hello ${count}`;
		console.log(`sending "${data}"`);
		buffer.push(data);

		count--;
		if (count > 0) {
			setTimeout(emit, 1000);
		}
		else {
			console.log('end sending.');
			buffer.push(null);
		}
	};

	emit();
	reply.type('text/html').send(buffer)
})

fastify.listen({ port: 3000 });