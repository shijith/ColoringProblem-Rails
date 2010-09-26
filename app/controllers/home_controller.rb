class HomeController < ApplicationController
  def index
	@nodes = {}
	@adj = {}
	@adj_arg = {}
	i = 0
	@colors = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
	d = [0, 0, 0]
	counter = 0
	k = 0
	@graph = {}
	while params[String(k)]
		@graph[k] = params[String(k)]
		k += 1
	end

	k = 0
	for a in @graph
		n = a[0]
		b = a[1].split(/,/)
		@nodes[n] = [b[-2], b[-1]];
		b.pop()
		b.pop()
		if b != [""]
			@adj[n] = b
			for each in b
				c = Integer(each)
				if c > n
					if !@adj_arg[n]
						@adj_arg[n] = []
					end
					@adj_arg[n].push(c)
				end
			end
		end		
	end


	@colored = {}
	for color in @colors
		@colored[color] = []
	end
	
	color = 0

	for node,neigh in @adj
		while 1
			flag = 1
			a = neigh
			for conn in a
				if flag == nil
					break
				end
				for col in @colored[ @colors[color] ]
					if conn != ""
						if Integer(conn) == col
							color += 1
							flag = nil
							break
						end
					else
						flag = nil
						break
					end
				end
			end
			if flag
				@colored[ @colors[color] ].push(node)
				color = 0
				break
			end
		end
	end
end
end
