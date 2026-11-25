/* 
Pseudocode:

def svg_path():
	edge_pixels <- couloured pixels that have an uncoloured cell (its own corner, an adjacent corner or a neighboring pixel center)
	while not all edges covered:
		for all px in edge_pixels:
			start_point <- find_start_point()
			current_point <- start_point
			is_straight_line <- True
			do while current_point != start_point:
				// determine how the pixel continues from there
				
				if is_straight_line:
					if "corner of the right adjacent pixel is coloured":
						paths.add('rR') // Rounded
					else if "corner of the front right pixel is coloured:
						paths.add('rA') // Angular
					else if "corner of the front left pixel is coloured":
						paths.add('fS') // Straight
					else if "corner of the left adjacent pixel is coloured":
						paths.add('lA')
					else:
						paths.add('lR')
					
				if !is_straight_line: //is corner
					if "is round corner from the left":
						if "front right corner is coloured and back left corner is coloured":
							paths.add('lA') // Left Angular
						else if "front right corner is coloured and back right corner is coloured":
							paths.add('bS') // Back Straight
						else if "front right corner is coloured":
							paths.add('rA') // Right Angular
					
					if "is angular corner from the left":
						
					
			end do while
		end for
	end while
end def
	
def find_start_point():
	return a random point on a boundary where it goes from center boundary to corner boundary with coloured pixel on the left and the uncoloured cell on the right
*/